interface Fetcher {
	fetch(filePath: string, params?: { body: string; method: string }): Promise<string>;
}

const mockResponses: Record<string, string> = {
	'file1.txt': `Hello world! : 2024-02-22 14:35:30 UTC
  Goodbye world! : 2024-02-22 16:35:30 UTC
  Hello? : 2024-02-22 08:35:30 UTC
 Hi : 2024-02-22 12:35:30 UTC`,
	'file2.txt': `How are you doing ? : 2024-02-22 13:59:30 UTC
  Fine : 2024-02-22 12:44:30 UTC
  How about you ? : 2024-02-22 22:35:30 UTC
  Same : 2024-02-22 07:39:30 UTC`,
	'file3.txt': `Have you seen high elves ? : 2022-02-22 14:35:30 UTC
  HESOYAM : 2023-02-22 14:35:30 UTC
  BAGUVIX : 2021-02-22 14:35:30 UTC
  THERE IS NO SPOON : 2020-02-22 14:35:30 UTC`,
};

//Used try/catch blocks for error handling in method to catch errors and log them.
class MockFetcher implements Fetcher {
	fetch(filePath: string, params?: { body: string; method: string } | undefined): Promise<string> {
		try {
			return params?.method === 'POST' ? Promise.resolve('') : Promise.resolve(mockResponses[filePath] ?? '');
		} catch (error) {
			console.log(`Error fetching data for ${filePath}:${error}`);
			return Promise.resolve('');
		}
	}
}
class Parser {
	private fetcher: Fetcher;

	constructor(fetcher: Fetcher) {
		this.fetcher = fetcher;
	}

	//Used try/catch blocks for error handling in method to catch errors and log them.
	async getContent(file: string): Promise<{ message: string; timestamp: string }[]> {
		const content: { message: string; timestamp: string }[] = [];
		try {
			const res = await this.fetcher.fetch(file);
			const messages = res.split('\n');
			for (let i = 0; i < messages.length; i++) {
				const [message, timestamp] = messages[i].split(':');
				content.push({ message, timestamp });
			}
		} catch (error) {
			console.log(`Помилка при діставанні контенту ${error}`);
		}
		return content;
	}

	//The Single Responsibility Principle was violated
	//Used try/catch blocks for error handling in method to catch errors and log them.
	async saveContent(messages: { message: string; timestamp: string }[], file: string) {
		try {
			const waitGroup: Promise<void>[] = [];
			for (let i = 0; i < messages.length; i++) {
				const message = messages[i];
				const promise = this.saveMessage(message, file);
				waitGroup.push(promise);
			}
			await Promise.all(waitGroup);
		} catch (error) {
			console.log(`Error saving content to ${file}: ${error}`);
		}
	}
	//Used try/catch blocks for error handling in method to catch errors and log them.
	private async saveMessage(message: { message: string; timestamp: string }, file: string): Promise<void> {
		try {
			await new Promise<void>(resolve => setTimeout(() => resolve(), Math.random() * 5 * 1000));

			//save message in file
			const currentContent = mockResponses[file] || '';
			const newContent = `${currentContent}\n${message.message} : ${message.timestamp} UTC`;
			mockResponses[file] = newContent;
			console.log(`Saved message - ${message.message} to ${file} as ${message.message.length > 8 ? 'long' : 'short'}`);

			//data is added to the server
			await this.fetcher.fetch(file, {
				body: JSON.stringify({
					...message,
					type: message.message.length > 8 ? 'long' : 'short',
				}),
				method: 'POST',
			});
			// console.log(`Saved message - ${message.message} to ${file} as ${message.message.length > 8 ? 'long' : 'short'}`);
		} catch (error) {
			console.log(`Помилка при збереженні повідомлення у файлі ${file}, та повідомленні ${message}`, error);
		}
	}
}

const main = async () => {
	try {
		const fetcher = new MockFetcher();
		const parser = new Parser(fetcher);

		const files = {
			'file1.txt': 'out1.txt',
			'file2.txt': 'out2.txt',
			'file3.txt': 'out3.txt',
		};

		const waitGroup: Promise<any>[] = [];

		for (const [input, output] of Object.entries(files)) {
			const promise = new Promise<void>(resolve => {
				parser
					.getContent(input)
					.then(messages => parser.saveContent(messages, output))
					.catch(error => {
						console.error(`Error processing file ${input}: ${error}`);
					})
					.then(() => resolve()); // Resolve the promise after completion
			});
			waitGroup.push(promise);
		}

		await Promise.all(waitGroup);
		console.log('All files processed successfully.');
	} catch (error) {
		console.error(`Main function error: ${error}`);
	}
};

main();
