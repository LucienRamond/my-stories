export default function TextedSeparator({ title }: { title?: string }) {
  return (
    <div className=" grid justify-center items-center grid-rows-1 grid-cols-1">
      <div className=" row-span-1 row-start-1 row-end-2 col-start-1 col-end-2 h-px bg-border" />
      <div className="row-span-1 row-start-1 row-end-2 col-start-1 col-end-2 font-bold w-fit mx-auto bg-card px-4 ">
        {title}
      </div>
    </div>
  );
}
