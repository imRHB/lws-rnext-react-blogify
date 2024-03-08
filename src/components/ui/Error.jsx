export default function Error({ message }) {
    return message ? (
        <div className="px-4 py-3 rounded-md bg-slate-900">
            <p className="text-sm text-center text-red-500">{message}</p>
        </div>
    ) : null;
}
