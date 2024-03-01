import Avatar from "../ui/Avatar";

export default function CommentList() {
    return (
        <section>
            {/* <!-- Comment One --> */}
            <div className="flex items-start my-8 space-x-4">
                <Avatar name="Saad Hasan" />
                <div className="w-full">
                    <h5 className="font-bold text-slate -500">Saad Hasan</h5>
                    <p className="text-slate-300">
                        Today I was mob programming with Squares Mobile &
                        Performance Reliability team and we toyed with an
                        interesting idea. Our codebase has classes that
                        represent screens a user can navigate to. These classes
                        are defined in modules, and these modules have an owner
                        team defined. When navigating to a screen, we wanted to
                        have the owner team information available, at runtime.
                        We created a build tool that looks at about 1000 Screen
                        classes, determines the owner team, and generates a
                        class to do the lookup at runtime. The generated code
                        looked like this:
                    </p>
                </div>
            </div>

            {/* <!-- Comment Two --> */}
            <div className="flex items-start my-8 space-x-4">
                <Avatar name="Saad Hasan" />
                <div className="w-full">
                    <h5 className="font-bold text-slate -500">Saad Hasan</h5>
                    <p className="text-slate-300">
                        Today I was mob programming with Squares Mobile &
                        Performance Reliability team and we toyed with an
                        interesting idea. Our codebase has classes that
                        represent screens a user can navigate to. These classes
                        are defined in modules, and these modules have an owner
                        team defined. When navigating to a screen, we wanted to
                        have the owner team information available, at runtime.
                        We created a build tool that looks at about 1000 Screen
                        classes, determines the owner team, and generates a
                        class to do the lookup at runtime. The generated code
                        looked like this:
                    </p>
                </div>
            </div>

            {/* <!-- Comment Three --> */}
            <div className="flex items-start my-8 space-x-4">
                <Avatar name="Saad Hasan" />
                <div className="w-full">
                    <h5 className="font-bold text-slate -500">Saad Hasan</h5>
                    <p className="text-slate-300">
                        Today I was mob programming with Squares Mobile &
                        Performance Reliability team and we toyed with an
                        interesting idea. Our codebase has classes that
                        represent screens a user can navigate to. These classes
                        are defined in modules, and these modules have an owner
                        team defined. When navigating to a screen, we wanted to
                        have the owner team information available, at runtime.
                        We created a build tool that looks at about 1000 Screen
                        classes, determines the owner team, and generates a
                        class to do the lookup at runtime. The generated code
                        looked like this:
                    </p>
                </div>
            </div>
        </section>
    );
}
