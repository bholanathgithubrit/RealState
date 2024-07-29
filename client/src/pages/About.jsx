
const About = () => {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <section className="flex flex-wrap   flex-col md:flex-row mx-auto items-center justify-center mb-12">
        <div className="w-full lg:w-1/2 xl:w-1/3 p-4">
          <h2 className="text-lg font-bold mb-2">Our Story</h2>
          <p className="text-gray-600">
            At RealState, we believe that buying or selling a home is more than just a transaction - it is a life-changing experience. That is why we are dedicated to providing exceptional service and expert guidance every step of the way.
          </p>
          <p className="text-gray-600">
            With years of experience in the real estate industry, our team has the knowledge and expertise to help you achieve your goals. Whether you are a first-time buyer or a seasoned seller, we are here to help you navigate the process with confidence.
          </p>
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/3 p-4">
          <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"  className="rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out" />
        </div>
      </section>
      <section className="flex flex-wrap   flex-col md:flex-row mx-auto  items-center justify-center mb-12">
        <div className="w-full lg:w-1/2 xl:w-1/3 p-4 flex flex-col justify-center items-center">
          <h2 className="text-lg font-bold mb-2">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to provide the highest level of service and expertise in the real estate industry. We strive to build long-term relationships with our clients and provide them with the best possible experience.
          </p>
          <p className="text-gray-600">
            We believe that honesty, integrity, and transparency are essential in every aspect of our business. We are committed to being responsive, reliable, and results-driven, and to always putting our clients needs first.
          </p>
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/3 p-4">
          <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Real Estate Image" className="rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out" />
        </div>
      </section>
      <section className="flex flex-wrap -mx-4 mb-12">
      <h2 className="text-lg font-bold mb-2  text-center mx-auto">Meet Our Team</h2>
        <div className="flex flex-wrap   flex-col md:flex-row mx-auto  items-center justify-around mb-12 mt-6">
          
          <div className="flex flex-wrap ">
            <div className="w-full lg:w-1/2 xl:w-1/3 p-4">
              <img src="https://i.postimg.cc/y6RBM6MJ/sanniv.jpg" alt="Team Member 1" className="rounded-full mb-4 hover:shadow-xl transition duration-300 ease-in-out" />
              <h3 className="text-lg font-bold mb-2">Sanniv Das</h3>
              <p className="text-gray-600">
                Broker/Owner
              </p>
            </div>
            <div className="w-full lg:w-1/2 xl:w-1/3 p-4">
              <img src="https://i.postimg.cc/NM3tKZHf/bhola.jpg" alt="Team Member 2" className="rounded-full mb-4 hover:shadow-xl transition duration-300 ease-in-out" />
              <h3 className="text-lg font-bold mb-2">Bholanath Maity</h3>
              <p className="text-gray-600">
                Realtor
              </p>
            </div>
            <div className="w-full lg:w-1/2 xl:w-1/3 p-4">
            <img src="https://i.postimg.cc/x8L2MgvG/bikash-Copy.jpg" alt="Team Member 3" className="rounded-full mb-4 hover:shadow-xl transition duration-300 ease-in-out" />
              <h3 className="text-lg font-bold mb-2">Bikash santra</h3>
              <p className="text-gray-600">
                Realtor
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-wrap   flex-col md:flex-row mx-auto  items-center justify-around mb-12 mt-6">
        <div className="w-full lg:w-1/2 xl:w-1/3 p-4">
          <h2 className="text-lg font-bold mb-2">Our Values</h2>
          <ul className="list-none mb-4">
            <li className="mb-2">
              <i className="fas fa-check text-green-500 mr-2"></i>
              Integrity: We operate with honesty and transparency in every aspect of our business.
            </li>
            <li className="mb-2">
              <i className="fas fa-check text-green-500 mr-2"></i>
              Expertise: We are dedicated to staying up-to-date on the latest market trends and industry developments.
            </li>
            <li className="mb-2">
              <i className="fas fa-check text-green-500 mr-2"></i>
              Service: We are committed to providing exceptional service and support to our clients every step of the way.
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/3 p-4">
          <img src="https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Real Estate Image" className="rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out" />
        </div>
      </section>
    </div>
  );
};

export default About;