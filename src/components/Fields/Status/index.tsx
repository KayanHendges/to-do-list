import SingleSelect, {
  SelectPlacement,
  SingleSelectRootProps,
} from "@/components/Selects/SingleSelect";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IStatusConfig {
  label: string;
  borderColor: string;
}

interface StatusProps {
  onStatusSelect?: (status: TaskStatus) => void;
}

interface Props
  extends ComponentProps<"div">,
    StatusProps,
    SingleSelectRootProps {
  placement?: SelectPlacement;
  selected?: TaskStatus;
  label?: string;
}

const statusMapper: Record<TaskStatus, IStatusConfig> = {
  open: { label: "Aberto", borderColor: "border-yellow-500" },
  inProgress: { label: "Em progresso", borderColor: "border-blue-500" },
  done: { label: "Concluído", borderColor: "border-green-500" },
};

interface StatusItemProps extends StatusProps {
  status: TaskStatus;
  hoverEffect?: boolean;
  selected?: boolean;
}

const StatusItem = ({
  status,
  onStatusSelect,
  hoverEffect = true,
  selected,
}: StatusItemProps) => {
  const { borderColor, label } = statusMapper[status];

  return (
    <SingleSelect.Item
      key={status}
      onClick={() => onStatusSelect && onStatusSelect(status)}
      hoverEffect={hoverEffect}
      selected={selected}
    >
      <span className={twMerge("pl-2 border-l-2 ", borderColor)}>{label}</span>
    </SingleSelect.Item>
  );
};

export default function StatusField({
  selected,
  onStatusSelect,
  label,
  placement,
  ...props
}: Props) {
  return (
    <SingleSelect.Root {...props}>
      <SingleSelect.Label>{label}</SingleSelect.Label>
      <SingleSelect.Input hasTextInput={false}>
        {selected && <StatusItem status={selected} hoverEffect={false} />}
      </SingleSelect.Input>
      <SingleSelect.Menu placement={placement}>
        {Object.keys(statusMapper).map((key) => (
          <StatusItem
            key={key}
            status={key as TaskStatus}
            selected={key === selected}
            onStatusSelect={onStatusSelect}
          />
        ))}
      </SingleSelect.Menu>
    </SingleSelect.Root>
  );
}
