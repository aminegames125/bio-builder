const TableBlock = ({ headers = [], rows = [], title, striped = true }) => {
    if (!headers || !rows || headers.length === 0 || rows.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {title && (
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">{title}</h3>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="px-6 py-3 font-semibold tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={striped && rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                            >
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-6 py-4 text-gray-700 whitespace-nowrap">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableBlock;
