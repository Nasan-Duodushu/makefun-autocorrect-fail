// Funniest Autocorrect Fail — one line under 200 characters that reads as
// a hilarious autocorrect fail. Writes it to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

class FailWriter {
  private readonly path = "/output/entry.txt";
  private readonly limit = 199;
  private readonly text: string;

  constructor(text: string) {
    this.text = text;
  }

  private validate(): number {
    const count = [...this.text].length;
    if (count < 1 || count > this.limit) {
      throw new Error(`fail is ${count} chars, must be 1-${this.limit}`);
    }
    if (this.text.trim() === "") throw new Error("fail must not be blank");
    if (/\n/.test(this.text)) throw new Error("fail must be one line");
    return count;
  }

  async write(): Promise<void> {
    const n = this.validate();
    await mkdir("/output", { recursive: true });
    await writeFile(this.path, this.text, { encoding: "utf8" });
    console.log(`wrote ${n} chars to ${this.path}`);
  }
}

const FAIL =
  "I texted my boss 'Running five minutes late' — autocorrect sent 'Running five mimosas late', and now the whole office thinks I'm day-drinking.";

await new FailWriter(FAIL).write();
