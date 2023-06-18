import { execSync, spawnSync } from "child_process";
import { v4 as uuid } from "uuid";
import fs from "fs";

const IDENTIFY_CODE = process.env.IDENTIFY_CODE || "secret";

function PLClassifier(pl: string) {
  switch (pl) {
    case "Python":
      return { cmd: "python", ext: ".py" };
    case "JavaScript":
      return { cmd: "node", ext: ".js" };
    default:
      return { cmd: "", ext: "" };
  }
}

function parserPython(userCode: string, testCaseInput: any[]) {
  const totalCode =
    "import sys" +
    "\n\n" +
    userCode +
    "\n\n" +
    "if __name__ == '__main__':\n\t";
  const argsArr = [];
  const varArr = [];
  for (let i = 0; i < testCaseInput.length; i++) {
    varArr.push(
      `argv${i + 1} = ${
        testCaseInput[i].length > 1
          ? "[" + testCaseInput[i] + "]"
          : testCaseInput[i]
      }`
    );
    argsArr.push(`argv${i + 1}`);
  }
  const argsStr = argsArr.join(",");
  const varStr = varArr.join("\n\t");
  return (
    totalCode +
    varStr +
    "\n\tanswer = solution(" +
    argsStr +
    `)\n\tprint('${IDENTIFY_CODE}')\n\tprint(answer)`
  );
}

function parserNode(userCode: string, testCaseInput: any[]) {
  const argsArr = [];
  const varArr = [];
  for (let i = 0; i < testCaseInput.length; i++) {
    varArr.push(
      `\nlet argv${i + 1} = ${
        testCaseInput[i].length > 1
          ? "[" + testCaseInput[i] + "]"
          : testCaseInput[i]
      }`
    );
    argsArr.push(`argv${i + 1}`);
  }
  const argsStr = argsArr.join(",");
  const varStr = varArr.join("\n\t");
  return (
    userCode +
    varStr +
    "\nconst answer = solution(" +
    argsStr +
    `)\nconsole.log('${IDENTIFY_CODE}')\nconsole.log(answer)`
  );
}

function buildCode(userCode: string, testCaseInput: any[], cmd: string) {
  switch (cmd) {
    case "python":
      return parserPython(userCode, testCaseInput);
    case "node":
      return parserNode(userCode, testCaseInput);
    default:
      throw Error();
  }
}

export const gradingController = async (req: any, res: any) => {
    const {
      solvedId,
      language,
      userCode,
      testCaseNumber,
      testCaseInput,
      testCaseOutput,
    } = req.body;
    const fileName = uuid();
    const plClassifier = PLClassifier(language);
    const filePath = "./temp/" + fileName + plClassifier.ext;
  try {

    const totalCode = buildCode(userCode, testCaseInput, plClassifier.cmd);
    fs.writeFileSync(filePath, `${totalCode}`);
    const spawnResult = spawnSync(
      plClassifier.cmd,
      [`${filePath}`, testCaseInput],
      {
        maxBuffer: 1024 * 1024,
        timeout: 10000,
      }
    );

    const stdout = spawnResult.stdout.toString();
    const stderr = spawnResult.stderr.toString();
    const status = spawnResult.status;
    const signal = spawnResult.signal;
    const error = spawnResult.error;

    const strings = stdout.split(IDENTIFY_CODE);
    const userPrint = strings[0].replace(/\\r\\n/gi, "\n");
    const userAnswer = strings[1].trim();

    if (
      stderr.length === 0 &&
      JSON.stringify(testCaseOutput) === JSON.stringify(JSON.parse(userAnswer))
    ) {
      res.status(200).json({
        solvedId: solvedId,
        testCaseNumber: testCaseNumber,
        userPrint: userPrint,
        userAnswer: userAnswer,
        resultCode: 1000,
      });
    } else {
      res.status(200).json({
        solvedId: solvedId,
        testCaseNumber: testCaseNumber,
        userPrint: userPrint,
        userAnswer: userAnswer,
        resultCode: 1001,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      solvedId: req.body.solvedId,
      testCaseNumber: req.body.testCaseNumber,
      resultCode: 2000,
    });
  } finally {
    fs.unlinkSync(filePath);
  }
};

// NodeJS 만 우선적으로 동작하도록 구현
export const gradingDockerController = async (req: any, res: any) => {
    const {
      solvedId,
      language,
      userCode,
      testCaseNumber,
      testCaseInput,
      testCaseOutput,
    } = req.body;
    const fileName = uuid();
    const plClassifier = PLClassifier(language);
    const filePath = "./temp/" + fileName + plClassifier.ext;

  try {
    const totalCode = buildCode(userCode, testCaseInput, plClassifier.cmd);

    fs.writeFileSync(filePath, `${totalCode}`);

    const dockerCommand = `docker run --rm -v $(pwd)/temp/${fileName}.js:/test.js grading-container node test.js`;
    const result: any = execSync(dockerCommand);

    const strings = result.toString().split(IDENTIFY_CODE);
    const userPrint = strings[0].replace(/\\r\\n/gi, "\n");
    const userAnswer = strings[1].trim();

    if (JSON.stringify(testCaseOutput) === JSON.stringify(JSON.parse(userAnswer))) {
      res.status(200).json({
        solvedId: solvedId,
        testCaseNumber: testCaseNumber,
        userPrint: userPrint,
        userAnswer: userAnswer,
        resultCode: 1000,
      });
    } else {
      res.status(200).json({
        solvedId: solvedId,
        testCaseNumber: testCaseNumber,
        userPrint: userPrint,
        userAnswer: userAnswer,
        resultCode: 1001,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      solvedId: req.body.solvedId,
      testCaseNumber: req.body.testCaseNumber,
      resultCode: 2000,
    });
  } finally {
    fs.unlinkSync(filePath);
  }
};