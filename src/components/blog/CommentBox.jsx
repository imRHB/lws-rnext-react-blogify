import Avatar from "../ui/Avatar";

export default function CommentBox() {
    return (
        <section className="flex items-start space-x-4">
            <Avatar name="Saad Hasan" />
            <div className="w-full">
                <textarea
                    className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                    placeholder="Write a comment"
                ></textarea>
                <div className="flex justify-end mt-4">
                    <button className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700">
                        Comment
                    </button>
                </div>
            </div>
        </section>
    );
}
