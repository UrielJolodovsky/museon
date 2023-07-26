<div className="bg-formBack w-10/12 h-1/3 flex justify-center items-center flex-col gap-4">
  <h1 className="text-3xl font-bold text-white">Envia un mensaje</h1>
  <input className="bg-white border-black" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
  <button type='submit' className="bg-dashBack w-28 h-8 rounded-lg font-bold" onClick={addMessage}>Add</button>
  <div className='w-2/3  bg-white flex justify-center items-center'>
      <div className="bg-footerColor w-[300px] h-[300px] flex justify-center items-center flex-col gap-5" >
          {Array.isArray(messages) ? messages.map((museo, index) =>
              <div className='bg-dashBack w-full h-52  flex justify-center items-center flex-row gap-10 p-5' key={index}>
                  <h2 className='text-center font-bold text-black'>Name: {museo["author"]["name"]}</h2>
                  <div className=''>
                      <h1 className='text-center text-black'>Contenido del mensaje: {museo["content"]}</h1>
                  </div>
              </div>
          ) : ""}
      </div>
  </div>
</div>