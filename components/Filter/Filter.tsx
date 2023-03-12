type Filters = {
    filterTitles: String[],
}

const Filter = ({ filterTitles }: Filters) => {
    return (
        <select className='p-4 rounded cursor-pointer bg-white'>
            {
                filterTitles.map((filterTitle, index) => {
                    return (
                        <option key={index} value={`${filterTitle.toLowerCase()}`} className="p-4">{filterTitle}</option>
                    )
                })
            }
        </select>
    )
}

export default Filter