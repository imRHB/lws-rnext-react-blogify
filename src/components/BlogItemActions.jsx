import trashIcon from "/assets/icons/delete.svg";
import pencilIcon from "/assets/icons/edit.svg";

export default function BlogItemActions() {
    return (
        <div className="absolute top-0 right-0">
            <button>
                <img src="./assets/icons/3dots.svg" alt="3dots of Action" />
            </button>

            {/* <!-- Action Menus Popup --> */}
            <div className="action-modal-container">
                <button className="action-menu-item hover:text-lwsGreen">
                    <img src={pencilIcon} alt="Edit" />
                    Edit
                </button>
                <button className="action-menu-item hover:text-red-500">
                    <img src={trashIcon} alt="Delete" />
                    Delete
                </button>
            </div>
        </div>
    );
}
