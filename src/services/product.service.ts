import * as Yup from "yup";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { FindOptionsWhere, Like } from "typeorm";

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}

const createValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  price: Yup.number().required(),
  category: Yup.string().required(),
  description: Yup.string().required(),
  images: Yup.array().of(Yup.string()).required().min(1),
  qty: Yup.number().required().min(1),
  slug: Yup.string(),
});

const paginationSchema = Yup.object().shape({
  page: Yup.number().required(),
  limit: Yup.number().required(),
});

const productRepo = AppDataSource.getRepository(Product);

export const findAll = async (query: IPaginationQuery) => {
  const { limit, page, search } = query;

  await paginationSchema.validate({ page, limit });

  let where: FindOptionsWhere<Product>[] = [];

  if (search) {
    where = [
      {
        name: Like(`%${search}%`),
      },
    ];
  }

  const data = await productRepo.find({
    where,
    skip: (page - 1) * limit,
    take: limit,
    order: {
      createdAt: "DESC",
    },
  });

  const total = await productRepo.countBy(where);

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
    page: Number(page),
    limit: Number(limit),
  };
};
export const create = async (payload: Product) => {
  await createValidationSchema.validate(payload);

  const { name, price, category, description, images, qty, slug } = payload;

  const product = new Product();
  product.name = name;
  product.price = price;
  product.category = category;
  product.description = description;
  product.images = images;
  product.qty = qty;
  product.slug = slug;
  product.createdBy = 1; // should get from jwt and make relation with tabel User

  const results = productRepo.save(product);
  return results;
};
export const findById = async (id: number) => {
  const result = await productRepo.findOneBy({
    id,
  });
  return result;
};

export const findBySlug = async (slug: string) => {
  const result = await productRepo.findOneBy({
    slug,
  });
  return result;
};
export const update = async (id: number, payload: Product) => {
  const result = await AppDataSource.createQueryBuilder()
    .update(Product)
    .set({
      ...payload,
    })
    .where("id = :id", { id })
    .execute();
  return result;
};
export const remove = async (id: number) => {
  const result = await AppDataSource.createQueryBuilder()
    .delete()
    .from(Product)
    .where("id = :id", { id })
    .execute();
  return result;
};
