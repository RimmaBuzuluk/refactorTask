"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var mockResponses = {
    'file1.txt': "Hello world! : 2024-02-22 14:35:30 UTC\n  Goodbye world! : 2024-02-22 16:35:30 UTC\n  Hello? : 2024-02-22 08:35:30 UTC\n Hi : 2024-02-22 12:35:30 UTC",
    'file2.txt': "How are you doing ? : 2024-02-22 13:59:30 UTC\n  Fine : 2024-02-22 12:44:30 UTC\n  How about you ? : 2024-02-22 22:35:30 UTC\n  Same : 2024-02-22 07:39:30 UTC",
    'file3.txt': "Have you seen high elves ? : 2022-02-22 14:35:30 UTC\n  HESOYAM : 2023-02-22 14:35:30 UTC\n  BAGUVIX : 2021-02-22 14:35:30 UTC\n  THERE IS NO SPOON : 2020-02-22 14:35:30 UTC",
};
//Used try/catch blocks for error handling in method to catch errors and log them.
var MockFetcher = /** @class */ (function () {
    function MockFetcher() {
    }
    MockFetcher.prototype.fetch = function (filePath, params) {
        var _a;
        try {
            return (params === null || params === void 0 ? void 0 : params.method) === 'POST' ? Promise.resolve('') : Promise.resolve((_a = mockResponses[filePath]) !== null && _a !== void 0 ? _a : '');
        }
        catch (error) {
            console.log("Error fetching data for ".concat(filePath, ":").concat(error));
            return Promise.resolve('');
        }
    };
    return MockFetcher;
}());
var Parser = /** @class */ (function () {
    function Parser(fetcher) {
        this.fetcher = fetcher;
    }
    //Used try/catch blocks for error handling in method to catch errors and log them.
    Parser.prototype.getContent = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var content, res, messages, i, _a, message, timestamp, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        content = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fetcher.fetch(file)];
                    case 2:
                        res = _b.sent();
                        messages = res.split('\n');
                        for (i = 0; i < messages.length; i++) {
                            _a = messages[i].split(':'), message = _a[0], timestamp = _a[1];
                            content.push({ message: message, timestamp: timestamp });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.log("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0434\u0456\u0441\u0442\u0430\u0432\u0430\u043D\u043D\u0456 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0443 ".concat(error_1));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, content];
                }
            });
        });
    };
    //The Single Responsibility Principle was violated
    //Used try/catch blocks for error handling in method to catch errors and log them.
    Parser.prototype.saveContent = function (messages, file) {
        return __awaiter(this, void 0, void 0, function () {
            var waitGroup, i, message, promise, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        waitGroup = [];
                        for (i = 0; i < messages.length; i++) {
                            message = messages[i];
                            promise = this.saveMessage(message, file);
                            waitGroup.push(promise);
                        }
                        return [4 /*yield*/, Promise.all(waitGroup)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log("Error saving content to ".concat(file, ": ").concat(error_2));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Used try/catch blocks for error handling in method to catch errors and log them.
    Parser.prototype.saveMessage = function (message, file) {
        return __awaiter(this, void 0, void 0, function () {
            var currentContent, newContent, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, Math.random() * 5 * 1000); })];
                    case 1:
                        _a.sent();
                        currentContent = mockResponses[file] || '';
                        newContent = "".concat(currentContent, "\n").concat(message.message, " : ").concat(message.timestamp, " UTC");
                        mockResponses[file] = newContent;
                        console.log("Saved message - ".concat(message.message, " to ").concat(file, " as ").concat(message.message.length > 8 ? 'long' : 'short'));
                        //data is added to the server
                        return [4 /*yield*/, this.fetcher.fetch(file, {
                                body: JSON.stringify(__assign(__assign({}, message), { type: message.message.length > 8 ? 'long' : 'short' })),
                                method: 'POST',
                            })];
                    case 2:
                        //data is added to the server
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u0456 \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F \u0443 \u0444\u0430\u0439\u043B\u0456 ".concat(file, ", \u0442\u0430 \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u0456 ").concat(message), error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Parser;
}());
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var fetcher, parser_1, files, waitGroup, _loop_1, _i, _a, _b, input, output, error_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                fetcher = new MockFetcher();
                parser_1 = new Parser(fetcher);
                files = {
                    'file1.txt': 'out1.txt',
                    'file2.txt': 'out2.txt',
                    'file3.txt': 'out3.txt',
                };
                waitGroup = [];
                _loop_1 = function (input, output) {
                    var promise = new Promise(function (resolve) {
                        parser_1
                            .getContent(input)
                            .then(function (messages) { return parser_1.saveContent(messages, output); })
                            .catch(function (error) {
                            console.error("Error processing file ".concat(input, ": ").concat(error));
                        })
                            .then(function () { return resolve(); }); // Resolve the promise after completion
                    });
                    waitGroup.push(promise);
                };
                for (_i = 0, _a = Object.entries(files); _i < _a.length; _i++) {
                    _b = _a[_i], input = _b[0], output = _b[1];
                    _loop_1(input, output);
                }
                return [4 /*yield*/, Promise.all(waitGroup)];
            case 1:
                _c.sent();
                console.log('All files processed successfully.');
                return [3 /*break*/, 3];
            case 2:
                error_4 = _c.sent();
                console.error("Main function error: ".concat(error_4));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
main();
