import React, { useState, useEffect } from 'react';
import { Clock, Save, Check, ExternalLink } from 'lucide-react';
import { useAppointmentStore } from '../../store/appointmentStore';
import GoogleCalendarConnect from '../calendar/GoogleCalendarConnect';

interface WorkingHours {
  start: string;
  end: string;
  enabled: boolean;
}

interface DaySchedule {
  [key: string]: WorkingHours;
}

const BookingSettings: React.FC = () => {
  const bookingSettings = useAppointmentStore((state) => state.bookingSettings);
  const updateBookingSettings = useAppointmentStore((state) => state.updateBookingSettings);
  const initializeBookingId = useAppointmentStore((state) => state.initializeBookingId);

  const [barberName, setBarberName] = useState(bookingSettings.barberName);
  const [schedule, setSchedule] = useState<DaySchedule>(bookingSettings.workingHours);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [calendarError, setCalendarError] = useState('');

  useEffect(() => {
    initializeBookingId();
  }, [initializeBookingId]);

  useEffect(() => {
    setBarberName(bookingSettings.barberName);
    setSchedule(bookingSettings.workingHours);
  }, [bookingSettings]);

  const bookingPageUrl = `https://mybarber.ai/book/${bookingSettings.bookingId}`;

  const handleScheduleChange = (
    day: string,
    field: keyof WorkingHours,
    value: string | boolean
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    updateBookingSettings({
      barberName,
      workingHours: schedule,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(time);
      }
    }
    return options;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Booking Settings</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Barber Name
            </label>
            <input
              type="text"
              value={barberName}
              onChange={(e) => setBarberName(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#8f00ff]"
              placeholder="Enter your name"
            />
            <p className="mt-1 text-sm text-gray-400">
              This name will be displayed on your public booking page
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg max-w-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Your Booking Page</div>
                <div className="text-[#8f00ff]">{bookingPageUrl}</div>
              </div>
              <a
                href={bookingPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-[#8f00ff] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View
              </a>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="text-sm font-medium text-gray-400">
                  Calendar Integration
                </label>
                <p className="text-sm text-gray-400 mt-1">
                  Connect your Google Calendar to automatically sync your appointments
                </p>
              </div>
              <GoogleCalendarConnect
                onError={setCalendarError}
                onSuccess={() => setCalendarError('')}
              />
            </div>
            {calendarError && (
              <div className="text-red-500 text-sm mt-2">
                {calendarError}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Working Hours</h4>
            <div className="space-y-4">
              {Object.entries(schedule).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-32">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={hours.enabled}
                        onChange={(e) =>
                          handleScheduleChange(day, 'enabled', e.target.checked)
                        }
                        className="form-checkbox h-4 w-4 text-[#8f00ff] rounded border-gray-700 bg-gray-800 focus:ring-[#8f00ff]"
                      />
                      <span className="ml-2 capitalize">{day}</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <select
                      value={hours.start}
                      onChange={(e) =>
                        handleScheduleChange(day, 'start', e.target.value)
                      }
                      disabled={!hours.enabled}
                      className="px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#8f00ff] disabled:opacity-50"
                    >
                      {generateTimeOptions().map((time) => (
                        <option key={`start-${time}`} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <span className="text-gray-400">to</span>
                    <select
                      value={hours.end}
                      onChange={(e) =>
                        handleScheduleChange(day, 'end', e.target.value)
                      }
                      disabled={!hours.enabled}
                      className="px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#8f00ff] disabled:opacity-50"
                    >
                      {generateTimeOptions().map((time) => (
                        <option key={`end-${time}`} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                saveSuccess ? 'bg-green-600' : 'bg-[#8f00ff] hover:bg-[#7a00d9]'
              } text-white`}
            >
              {saveSuccess ? (
                <Check className="w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saveSuccess ? 'Saved!' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSettings;