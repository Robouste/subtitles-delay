import { Component } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	public subtitles: string = "";
	public delay: number = 1000;
	public output: string = "";

	public process(): void {
		this.output = this.subtitles.slice();

		const regex: RegExp = /(\d{2}\:\d{2}\:\d{2}\.\d{3})/gm;
		const matches: Set<string> = new Set();
		let match: RegExpExecArray | null;

		while ((match = regex.exec(this.output)) != null) {
			matches.add(match[0]);
		}

		matches.forEach((time: string) => {
			const date = new Date("1970-01-01 " + time.replace(".", ":"));
			date.setMilliseconds(date.getMilliseconds() + this.delay);
			console.log(time, date.getSeconds() + ":" + date.getMilliseconds());
			const hour: string = date.getHours().toString().padStart(2, "0");
			const min: string = date.getMinutes().toString().padStart(2, "0");
			const sec: string = date.getSeconds().toString().padStart(2, "0");
			const ms: string = date
				.getMilliseconds()
				.toString()
				.padStart(3, "0");
			const newTime = `${hour}:${min}:${sec}.${ms}`;

			this.output = this.output.replaceAll(time, newTime);
		});
	}
}
