import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/input/select";
import { ChartNoAxesGantt } from "lucide-react";

export default function Sort({ applyTheme = true }: { applyTheme?: boolean }) {
  return (
    <Select>
      <SelectTrigger applyTheme={applyTheme}>
        <ChartNoAxesGantt />
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent
        className="max-h-[50vh]"
        position="popper"
        applyTheme={applyTheme}
      >
        <SelectGroup>
          {[
            {
              label: "Asc",
              value: "asc",
            },
            {
              label: "Desc",
              value: "desc",
            },
          ].map((option) => (
            <SelectItem value={option?.value} key={option?.value}>
              {option?.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
