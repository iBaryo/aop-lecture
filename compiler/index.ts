import * as ts from "typescript";

const program = ts.createProgram(['compiler/mySrc.ts'], require('../tsconfig.json').compilerOptions);
const checker = program.getTypeChecker();

const locations = program.getSourceFile('compiler/mySrc.ts').forEachChild(n => visit(n));
console.log(`res:`, locations);

function visit(node: ts.Node, depth = 0) {
    // console.log(new Array(depth).fill('#').join(''), ts.SyntaxKind[node.kind], node.getText());

    if (ts.isIfStatement(node) || ts.isPrefixUnaryExpression(node)) {
        const exprNode = ts.isIfStatement(node) ? node.expression : node.operand;
        const type = checker.getTypeAtLocation(exprNode);

        if (checker.typeToString(type) == 'Loading') {
            const loc = ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.getStart())
            console.log({
                file: node.getSourceFile().fileName,
                line: loc.line,
                position: loc.character,
                use: ts.SyntaxKind[node.kind],
                expression: exprNode.getText()
            });
        }
    }

    node.forEachChild(n => visit(n, depth + 1));
}
