export default function Divider({ width }) {
    return (
        <div
            className={`${
                width === "full" ? "w-full" : "w-3/4"
            } mx-auto border-b border-[#3F3F3F] py-6 lg:py-8`}
        />
    );
}
