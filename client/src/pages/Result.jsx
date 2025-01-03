import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Result = () => {
    const [image, setImage] = useState(assets.sample_img_1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    const { generateImage } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (input) {
            const generatedImage = await generateImage(input);
            console.log("Generated Image:", generatedImage);  // Log the generated image
            if (generatedImage) {
                setIsImageLoaded(true);
                setImage(generatedImage);
                console.log("Image set in state:", generatedImage); // Log the image being set in state
            }
        }
        setLoading(false);
    };

    return (
        <motion.form 
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmitHandler}
            action=""
            className='flex flex-col min-h-[90vh] justify-center items-center'
        >
            <div>
                <div className='relative'>
                    <img src={image} alt="Generated" className='max-w-sm rounded' onError={(e) => console.error("Image Load Error:", e)} />
                    <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10]' : 'w-0'}`} />
                </div>
                <p className={!loading ? 'hidden' : ''}>Loading...</p>
            </div>
            {!isImageLoaded && 
                <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
                    <input
                        onChange={e => setInput(e.target.value)}
                        value={input}
                        type="text"
                        placeholder='Provide details on the type of image you wish to create.'
                        className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'
                    />
                    <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Create...</button>
                </div>
            }
            {isImageLoaded && 
                <div className='flex flex-wrap gap-2 justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
                    <p onClick={() => setIsImageLoaded(false)} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Create Another</p>
                    <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
                </div>
            }
        </motion.form>
    );
};

export default Result;
