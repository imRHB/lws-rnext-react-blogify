import trashIcon from "/assets/icons/delete.svg";
import pencilIcon from "/assets/icons/edit.svg";

export default function BlogItemActions() {
    return (
        <div className="z-50 action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
                <img src={pencilIcon} alt="Edit" />
                Edit
            </button>
            <button className="action-menu-item hover:text-red-500">
                <img src={trashIcon} alt="Delete" />
                Delete
            </button>
        </div>
    );
}
