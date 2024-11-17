import { cn } from "@/lib/utils";

export const InputUnit = (props: any) => {
  const { className, placeholder, type, ...rest } = props;
  return (
    <div className={cn("relative text-xs h-8", className)}>
      <input
        type={type}
        className="block w-full h-full rounded-md bg-neutral-100 px-2 hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:bg-neutral-100"
        placeholder={placeholder}
        {...rest}
      />
      <div className="absolute inset-y-0 text-xs text-neutral-500 right-2 flex items-center">
        <span>px</span>
      </div>
    </div>
  );
};
