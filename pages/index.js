import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const Books = ({ books }) => {
  return (
    <>
      <Navbar />
      <div className="xs:mx-5 sm:mx-10 md:mx-20 lg:mx-30">
        <div className="flex flex-col mt-10">
          <div className="flex flex-wrap justify-center justify-items-center items-start mx-8 mb-16">
            {books.map((book) => {
              return (
                <div
                  key={book.id}
                  className="max-w-sm w-1/3 m-4 md:w-full self-stretch bg-white rounded-lg border border-gray-200 shadow-md relative"
                >
                <Image
                  src={`/${book.image.replace(/\\/g, '/')}`}
                  alt="Book Image"
                  width={500}
                  height={500}
                  className="h-60 w-full object-cover object-center rounded"
                />
                  <div className="p-5">
                    <h5 className="text-lg font-bold tracking-tight text-[#082032]">
                      {book.title}
                    </h5>
                    <p className="mb-14 text-sm text-[#FF4C29]">
                      {book.author}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;

export const getServerSideProps = async () => {
  const data = await prisma.book.findMany();
  return {
    props: {
      books: data,
    },
  };
};
