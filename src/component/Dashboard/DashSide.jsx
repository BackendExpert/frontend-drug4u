import React, { useEffect, useRef, useState } from "react";
import {
    Activity,
    Shield,
    Factory,
    Cpu,
    Radar,
    Wrench,
    BellRing,
    Users,
    Settings,
    ChevronDown,
    ChevronRight,
    Hexagon,
} from "lucide-react";

import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MdHealthAndSafety } from "react-icons/md";


const DashSide = () => {
    const { auth } = useAuth();

    const [openMenu, setOpenMenu] = useState("Factories");

    const location = useLocation();
    const menuRef = useRef(null);

    const toggleMenu = (name) => {
        setOpenMenu(openMenu === name ? null : name);
    };

    useEffect(() => {
        if (menuRef.current) {
            menuRef.current.scrollTop = 0;
        }
    }, [location.pathname]);

    useEffect(() => {
        filteredMenus.forEach((section) => {
            section.items.forEach((item) => {
                if (item.submenu) {
                    const match = item.submenu.find((sub) =>
                        location.pathname.startsWith(sub.link)
                    );

                    if (match) {
                        setOpenMenu(item.name);
                    }
                }
            });
        });
    }, [location.pathname]);

    const menus = [
        {
            title: "Overview",
            items: [
                {
                    name: "Dashboard",
                    icon: <Activity size={18} />,
                    link: "/dashboard",
                    roles: ['super_admin', 'customer', 'pharmacist'],
                },
            ],
        },

        {
            title: "patient management",
            items: [
                {
                    name: "Patients",
                    icon: <MdHealthAndSafety size={18} />,
                    link: "/dashboard/patients",
                    roles: ['pharmacist'],
                },

                // {
                //     name: "Settings",
                //     icon: <Settings size={18} />,
                //     link: "/dashboard",
                //     roles: ['pharmacist'],
                // },
            ],
        },

        {
            title: "Administration",
            items: [
                {
                    name: "Users",
                    icon: <Users size={18} />,
                    link: "/dashboard/users",
                    roles: ['super_admin'],
                },

                {
                    name: "Settings",
                    icon: <Settings size={18} />,
                    link: "/dashboard/settings",
                    roles: ['super_admin'],
                },
            ],
        },
    ];

    const filteredMenus = menus
        .map((section) => ({
            ...section,
            items: section.items.filter((item) =>
                item.roles.includes(auth?.role)
            ),
        }))
        .filter((section) => section.items.length > 0);

    return (
        <div className="w-full h-screen bg-white border-r border-gray-200 flex flex-col overflow-hidden">
            <style>
                {`
                *{
                    scrollbar-width: thin;
                    scrollbar-color: #d1d5db transparent;
                }

                *::-webkit-scrollbar{
                    width: 4px;
                }

                *::-webkit-scrollbar-track{
                    background: transparent;
                }

                *::-webkit-scrollbar-thumb{
                    background: #9ca3af;
                    border-radius: 999px;
                }

                *::-webkit-scrollbar-thumb:hover{
                    background: #6b7280;
                }
            `}
            </style>

            <div className="px-5 py-6 border-b border-gray-200 shrink-0 bg-white">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-black flex items-center justify-center shadow-lg">
                        <Hexagon size={22} className="text-white" />
                    </div>

                    <div>
                        <h1 className="text-gray-900 font-bold text-lg leading-none">
                            Drug4U
                        </h1>

                        <p className="text-gray-500 text-xs mt-1">
                            Health-Care
                        </p>
                    </div>
                </div>
            </div>

            <div
                ref={menuRef}
                className="flex-1 overflow-y-auto px-3 py-5 bg-white"
            >
                {filteredMenus.map((section, index) => (
                    <div key={index} className="mb-6">
                        <h2 className="uppercase px-3 mb-3 text-[10px] tracking-[2px] font-bold text-gray-400">
                            {section.title}
                        </h2>

                        <div className="space-y-2">
                            {section.items.map((item, i) => (
                                <div key={i}>
                                    {item.submenu ? (
                                        <>
                                            <button
                                                onClick={() => toggleMenu(item.name)}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 border ${openMenu === item.name
                                                    ? "bg-black text-white border-black shadow-md"
                                                    : "bg-gray-50 text-gray-700 border-gray-100 hover:bg-black hover:text-white hover:border-black"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {item.icon}

                                                    <span className="text-sm font-semibold">
                                                        {item.name}
                                                    </span>
                                                </div>

                                                {openMenu === item.name ? (
                                                    <ChevronDown size={16} />
                                                ) : (
                                                    <ChevronRight size={16} />
                                                )}
                                            </button>

                                            <div
                                                className={`overflow-hidden transition-all duration-500 ${openMenu === item.name
                                                    ? "max-h-96 opacity-100 mt-2"
                                                    : "max-h-0 opacity-0"
                                                    }`}
                                            >
                                                <div className="ml-4 pl-4 border-l-2 border-gray-200 space-y-2">
                                                    {item.submenu.map((sub, index) => (
                                                        <NavLink
                                                            key={index}
                                                            to={sub.link}
                                                            className={({ isActive }) =>
                                                                `block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                                                    ? "bg-black text-white shadow-sm"
                                                                    : "text-gray-500 hover:bg-gray-100 hover:text-black"
                                                                }`
                                                            }
                                                        >
                                                            {sub.name}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <NavLink
                                            to={item.link}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all border ${isActive
                                                    ? "bg-black text-white border-black shadow-md"
                                                    : "bg-gray-50 text-gray-700 border-gray-100 hover:bg-black hover:text-white hover:border-black"
                                                }`
                                            }
                                        >
                                            {item.icon}
                                            {item.name}
                                        </NavLink>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
                <div className="bg-black rounded-2xl p-4 shadow-lg">
                    <p className="text-white font-semibold text-sm">
                        {auth?.username || "User"}
                    </p>

                    <p className="text-gray-400 text-xs mt-1 capitalize">
                        {auth?.role}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashSide;