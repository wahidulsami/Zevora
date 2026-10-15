import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

MAX_DEPTH = 10
CACHE_DIR = Path(".cache")


@dataclass(frozen=True)
class Report:
    title: str
    score: float = 0.0
    tags: list[str] = field(default_factory=list)

    def to_json(self) -> str:
        return json.dumps({"title": self.title, "score": self.score}, indent=2)


def load_reports(path: Path, *, strict: bool = False) -> list[Report]:
    reports: list[Report] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        try:
            record = json.loads(line)
        except json.JSONDecodeError as exc:
            if strict:
                raise ValueError(f"invalid record: {exc}") from exc
            print(f"skipping bad line: {line[:32]!r}")
            continue
        reports.append(Report(title=record["title"], score=record.get("score", 0.0)))
    return reports


def main() -> Optional[int]:
    if not CACHE_DIR.exists():
        print("cache missing, nothing to do")
        return None

    reports = load_reports(CACHE_DIR / "reports.jsonl")
    for index, report in enumerate(reports, start=1):
        print(f"{index:>3} {report.title} score={report.score:.2f}")
    return len(reports)


if __name__ == "__main__":
    raise SystemExit(main())
