const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' }

export const isWeekend = (datetime: string) => new Date(datetime).getDay() % 6 === 0

export const getDate = (datetime: string) => {
  const [date, time] = datetime.split(':')
  const [weekday, day] = new Date(date).toLocaleString('en', options).split(', ')
  return { weekday, day, time: time ? `${time} hours` : null }
}
