import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-between w-full pt-8 bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1611965008308-f117c8ca80fd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
    >
      <Image
                    className="w-16 rounded-lg"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAjVBMVEX/zQkAAAD/0wn/0Qn/1An/zwmFawQvJQFzXQOJbwW4lQb9ywldSgOfgAUjHABoUwNHOAKRdAXUqgduWAPywwjarwdhTgPZrgfFnwa9mAbjtgghGgHrvQiBZwQZEwBOPwKnhgUqIQG1kQYdFwDOpQc5LgEMCAB6YQRVRAOXeQUzKQEJBgA4LQEuJAGVdwVJ7X0BAAAEFUlEQVR4nO3a61biShCG4djdBULYIILIUQWGQefg/V/ebAhJV4dEWTOzlGbe55dUQkx9pnPomCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPyzxJXIZ+/Rh5P7US8wmv5zIdjxVcm9/ex9+mjHGdyRARlcQgZi3pb3Z/OC+1LOYOryZf7kaNUmpObXSbjipyUpt4vGWxZP2a7ZSf/gdVDOYPuaL0vydu146zehrhsy979uu6vbVV5YtD8rBLsqd1TSc/v1TPed9fZu8zZk+OCrN745M/Llx13Z+EQb5uPb37Ptd9oa7DOQ6SkRXLWKNqweMU952UxUdb47PMx1xZc/2IkZmKeTMtj4o940VH2Y1SX96murfcsRZeAeT8rgyg99Sb/5ci9rz219qZOV4slAhqdF4I/60mgY78a+vVWVeZZWPBm8u1buWfVhWr7eTSURWfrC6rBiPBm4o+thnaG6DurR0HKJe/UfR8VZ8hwyOOXaGJzLusfWfqm+yAfH/r3Rl5YiqnPIQObtycHY787NOC+2d5d83cyLM0fU2eLaqY3r0XBj1Gm1XbR7DhkkYnPuv2J3Oq6o2lIvFQ/KYp6LxQ+pujMORoOKYOC7PYsMPKMzCJZY30pTKiZM9N3DF51RMBoKX9VJI4oMRMSqkVx5Q6vvIlvm/28UPTp1BBUm+uIRQQaSpmniF4R/5oLdFCts0h0pvt48imCge40hA/v8MOt+Lxas08q5Q9P3Lc5ms/WmSMrelyN4GOpNRJHBTdDAdfV+ljvt+tVcP1wUjIQoM5hUP+NLEj5aqwxEwtFQSjHCDIY10+hmUZdB6RhZlrYQRQYb3cGobjdLk4wP6nARp2MchFfdKDKQl4aa+lnV7aakfqVma9FXGZjwbnwc31hIjD6pzaWO6xUrrcWpbmQeRFC6LMSRQSL+UH62aR1Rf+1bfeI05dmXQXTXhSCD71f11DKdQcUk3CS2e6QggxOpDGzFXGwwGi4/A5GqechBZM8Lf5aB2qTWju3Z+Q8y0CNhqU4M6uH50jMQ/dWJ6/gPvfOaR/L+egbmRXdt9Y1CMRouPAN7p2pzSZw+OeSjIboMOpN2LdVgloGIetTYv3sxqpD/hugyaKip1hI9c55lYNTrhMd9e8GBsTqfd23K+xks6vdSVH/7DIJH5mk2OoLZxWw0XHIGkvzwhZfD5iSZ+eLobN47K381A/1K4of4f09RB8J+NFxwBsGLBfX8oFrOXj2fWQb2ad3MLPUdvXSWh3K3/0YG09lhreb6ThJ5zL/U7LZ0oMNvP4sF293x0ujmH1/PIIMav/ePuKn/KdiAVK5zRopZoZPKdV+W8FPdxvIlp20dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICY/QJBtD9XALSq7AAAAABJRU5ErkJggg=="
                    alt="Drive Logo"
                    width={800}
                    height={800}
                 />
      <div className="bg-white py-4  pb-7 px-4 ">
        <h2 className="text-3xl font-bold ">Get Started with Uber</h2>
        <Link href="/login"className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
      </div>
    </div>
  );
}
