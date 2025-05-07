import { Input, InputProps } from "@/components/input/text-input";
import { cn } from "@/shared/_utils/cn";
import { SearchIcon } from "lucide-react";

export default function Search({
  applyTheme = true,
  ...props
}: {
  props?: InputProps;
  applyTheme?: boolean;
}) {
  return (
    <div>
      <Input
        type="email"
        placeholder="Search"
        {...props}
        applyTheme={applyTheme}
        leftIcon={
          <SearchIcon
            className={cn(
              " text-dark-ash-900",
              applyTheme && "dark:text-white"
            )}
          />
        }
      />
    </div>
  );
}
