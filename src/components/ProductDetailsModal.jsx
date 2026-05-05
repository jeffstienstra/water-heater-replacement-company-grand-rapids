export default function ProductDetailsModal({ model, imageMap = {}, onClose }) {
    if (!model) return null;

    return (
        <>
            <div className='bg-primary text-white items-center justify-between flex gap-2 p-4 rounded-t-lg'>
                <h2 className='text-xl font-semibold'>{model.brand} {model.label}</h2>
                <button
                    className='text-white/80 hover:text-white text-2xl leading-none ml-4 shrink-0'
                    onClick={onClose}
                    aria-label='Close product details'
                >
                    ✕
                </button>
            </div>

            <div className='p-6 overflow-y-auto max-h-[70vh]'>
                <img
                    className='max-h-48 mx-auto mb-6'
                    src={imageMap[model.imagePath] ?? model.imagePath}
                    alt={`${model.brand} ${model.label}`}
                />

                {model.features?.length > 0 && (
                    <div className='mb-6'>
                        <h3 className='text-lg font-semibold text-primary mb-3'>Specifications</h3>
                        <ul className='divide-y divide-base-200 border border-base-200 rounded-lg overflow-hidden text-sm'>
                            {model.features.map((feature, idx) => (
                                <li key={idx} className='flex justify-between px-4 py-2 odd:bg-base-100 even:bg-white'>
                                    <span className='font-medium text-gray-700'>{feature.label}</span>
                                    <span className='text-gray-600 text-right pl-4'>{feature.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {model.warranty && (
                    <div className='mb-6'>
                        <h3 className='text-lg font-semibold text-primary mb-3'>Warranty</h3>
                        <ul className='divide-y divide-base-200 border border-base-200 rounded-lg overflow-hidden text-sm'>
                            <li className='flex justify-between px-4 py-2 bg-base-100'>
                                <span className='font-medium text-gray-700'>{model.type === 'tankless' ? 'Heat Exchanger' : 'Tank'}</span>
                                <span className='text-gray-600'>{model.warranty.tank} Years</span>
                            </li>
                            <li className='flex justify-between px-4 py-2 bg-white'>
                                <span className='font-medium text-gray-700'>Parts</span>
                                <span className='text-gray-600'>{model.warranty.parts} Years</span>
                            </li>
                            <li className='flex justify-between px-4 py-2 bg-base-100'>
                                <span className='font-medium text-gray-700'>Labor</span>
                                <span className='text-gray-600'>{model.warranty.labor} Years</span>
                            </li>
                        </ul>
                    </div>
                )}

                {model.notes && (
                    <p className='text-sm text-gray-500 mt-2'>{model.notes}</p>
                )}
            </div>

            <div className='px-6 pb-6 flex justify-end'>
                <button className='btn btn-outline' onClick={onClose}>Close</button>
            </div>
        </>
    );
}
