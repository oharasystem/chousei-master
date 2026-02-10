/** @jsxImportSource react */
"use client"

import { useState, useMemo } from 'react'
import { DayPicker } from 'react-day-picker'
import { ja } from 'date-fns/locale'
import { isSameDay, startOfDay, startOfMonth, addMonths, isBefore } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'react-day-picker/style.css'

interface SimpleCalendarProps {
    selectedDate?: Date
    onDateSelect: (date: Date) => void
    markedDates?: Date[]
}

export default function SimpleCalendar({ selectedDate, onDateSelect, markedDates = [] }: SimpleCalendarProps) {
    const today = useMemo(() => startOfDay(new Date()), [])
    const currentMonth = useMemo(() => startOfMonth(new Date()), [])
    const [month, setMonth] = useState<Date>(selectedDate || new Date())

    // Check if a date is in the marked dates array
    const isMarked = (date: Date) => {
        return markedDates.some(markedDate => isSameDay(date, markedDate))
    }

    // Check if we can go to previous month
    const canGoPrevious = !isBefore(addMonths(month, -1), currentMonth) && !isSameDay(startOfMonth(month), currentMonth)

    const handlePreviousMonth = () => {
        if (canGoPrevious) {
            setMonth(addMonths(month, -1))
        }
    }

    const handleNextMonth = () => {
        setMonth(addMonths(month, 1))
    }

    return (
        <div className="p-3">
            {/* Custom Navigation Header */}
            <div className="flex items-center justify-between mb-4">
                <button
                    type="button"
                    onClick={handlePreviousMonth}
                    disabled={!canGoPrevious}
                    className={`p-1.5 rounded-md border transition-colors ${canGoPrevious
                            ? 'border-gray-200 hover:bg-gray-100 cursor-pointer'
                            : 'border-gray-100 text-gray-300 cursor-not-allowed'
                        }`}
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium">
                    {month.getFullYear()}年{month.getMonth() + 1}月
                </span>
                <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            {/* Calendar Grid */}
            <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && onDateSelect(date)}
                month={month}
                onMonthChange={setMonth}
                locale={ja}
                showOutsideDays
                hideNavigation
                disabled={{ before: today }}
                modifiers={{
                    marked: (date) => isMarked(date)
                }}
                modifiersStyles={{
                    marked: {
                        backgroundColor: '#dbeafe',
                        borderRadius: '0.375rem',
                        fontWeight: 600,
                        color: '#1d4ed8'
                    }
                }}
                styles={{
                    month_caption: { display: 'none' },
                    weekdays: { display: 'flex' },
                    weekday: { width: '2.25rem', height: '2.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: '0.75rem', fontWeight: 400 },
                    week: { display: 'flex', marginTop: '0.25rem' },
                    day: { width: '2.25rem', height: '2.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 },
                    day_button: { width: '2.25rem', height: '2.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.375rem', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.875rem' },
                    selected: { backgroundColor: '#3b82f6', color: 'white', borderRadius: '0.375rem' },
                    today: { backgroundColor: '#f1f5f9', borderRadius: '0.375rem' },
                    outside: { color: '#9ca3af', opacity: 0.5 },
                    disabled: { color: '#d1d5db', cursor: 'not-allowed', opacity: 0.4 },
                }}
            />
        </div>
    )
}
