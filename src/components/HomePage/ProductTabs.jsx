const Products = () => {
  const items = ["POS", "Payroll", "Invoice", "Purchase", "Tasks"];

  return (
    <section className="py-16  bg-gradient-to-br from-[#F5C6C4] via-[#D8A8C0] to-[#9DA7AE] text-black">
      <div className="flex justify-center gap-8 text-lg font-medium">
        {items.map((item) => (
          <button
            key={item}
            className="px-6 py-2 rounded-full hover:bg-red-50 hover:text-red-500 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Products;
