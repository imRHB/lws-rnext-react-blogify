import commentIcon from "/assets/icons/comment.svg";
import heartIcon from "/assets/icons/heart.svg";
import thumbsUpIcon from "/assets/icons/like.svg";

export default function BlogActions() {
    return (
        <div className="floating-action">
            <ul className="floating-action-menus">
                <li>
                    <img src={thumbsUpIcon} alt="like" />
                    <span>10</span>
                </li>

                <li>
                    {/* <!-- There is heart-filled.svg in the icons folder --> */}
                    <img src={heartIcon} alt="Favorite" />
                </li>
                <a href="#comments">
                    <li>
                        <img src={commentIcon} alt="Comments" />
                        <span>3</span>
                    </li>
                </a>
            </ul>
        </div>
    );
}
