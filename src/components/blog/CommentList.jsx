import useUserProfile from "../../hooks/useUserProfile";
import Avatar from "../ui/Avatar";

export default function CommentList({ comments }) {
    const { user } = useUserProfile();

    return (
        <section>
            {comments?.map((comment) => (
                <div
                    key={comment?.id}
                    className="flex items-start my-8 space-x-4"
                >
                    <Avatar
                        name="Saad Hasan"
                        imgSrc={
                            user && user?.id === comment?.author?.id
                                ? `${
                                      import.meta.env.VITE_SERVER_BASE_URL
                                  }/uploads/avatar/${user?.avatar}`
                                : `${
                                      import.meta.env.VITE_SERVER_BASE_URL
                                  }/uploads/avatar/${comment?.author?.avatar}`
                        }
                    />
                    <div className="w-full">
                        <h5 className="font-bold text-slate -500">
                            {comment?.author?.firstName}{" "}
                            {comment?.author?.lastName}
                        </h5>
                        <p className="text-slate-300">{comment?.content}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}
