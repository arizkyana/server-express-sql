import { FindOptionsWhere, Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";
import { Bundle } from "../entity/Bundle";
import { User } from "../entity/User";

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}

const bundleRepo = AppDataSource.getRepository(Bundle);

export const create = async (payload: Bundle, course: number, user: User) => {
  // TODO: need add validation schema
  const bundle = new Bundle();

  bundle.title = payload.title;
  bundle.description = payload.description;
  bundle.price = payload.price;
  bundle.discount = payload.discount;
  bundle.course = course;

  const result = await bundleRepo.save(bundle);
  return result;
};
export const findAll = async (query: IPaginationQuery) => {
  const { limit, page, search } = query;

  let where: FindOptionsWhere<Bundle>[] = [];

  if (search) {
    where = [
      {
        title: Like(`%${search}%`),
      },
    ];
  }

  const data = await bundleRepo.find({
    where,
    skip: (page - 1) * limit,
    take: limit,
    order: {
      createdAt: "DESC",
    },
  });

  const total = await bundleRepo.countBy(where);

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
    page: Number(page),
    limit: Number(limit),
  };
};
export const findOne = async (id: number) => {
  const result = await bundleRepo.findOne({
    where: {
      id,
    },
  });
  return result;
};
export const update = async (id: number, payload: Bundle, course: number) => {
  const result = await AppDataSource.createQueryBuilder()
    .update(Bundle)
    .set({
      ...payload,
      course,
    })
    .where("id = :id", { id })
    .execute();
  return result;
};
export const remove = async (id: number) => {
  const result = await AppDataSource.createQueryBuilder()
    .delete()
    .from(Bundle)
    .where("id = :id", { id })
    .execute();
  return result;
};
