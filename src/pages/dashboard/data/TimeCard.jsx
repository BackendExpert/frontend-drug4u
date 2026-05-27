import React, { useEffect, useState } from 'react'
import { FaRegClock } from 'react-icons/fa'
import { IoCalendarOutline } from 'react-icons/io5'

const TimeCard = () => {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const day = now.toLocaleDateString('en-US', { weekday: 'long' })

    const date = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })

    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    })

    return (
        <div className="w-full flex items-center justify-between px-6 py-9 bg-white">

            <div className="flex items-center gap-4">
                <IoCalendarOutline className="text-black text-xl" />

                <div>
                    <div className="text-xs text-black uppercase tracking-widest">
                        {day}
                    </div>
                    <div className="text-base font-semibold text-black">
                        {date}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <FaRegClock className="text-black text-xl" />

                <div className="text-right">
                    <div className="text-xs text-black uppercase tracking-widest">
                        Current Time
                    </div>
                    <div className="text-lg font-semibold text-black tracking-wide">
                        {time}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TimeCard