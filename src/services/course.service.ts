import { FindOptionsWhere, Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";
import { User } from "../entity/User";

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}

const courseRepo = AppDataSource.getRepository(Course);

export const create = async (payload: Course, user: User) => {
  // TODO: need add validation schema
  const course = new Course();
  course.cover = payload.cover;
  course.title = payload.title;
  course.description = payload.description;
  course.createdBy = user.id;

  const result = await courseRepo.save(course);
  return result;
};
export const findAll = async (query: IPaginationQuery) => {
  const { limit, page, search } = query;

  let where: FindOptionsWhere<Course>[] = [];

  if (search) {
    where = [
      {
        title: Like(`%${search}%`),
      },
    ];
  }

  const data = await courseRepo.find({
    where,
    skip: (page - 1) * limit,
    take: limit,
    order: {
      createdAt: "DESC",
    },
  });

  const total = await courseRepo.countBy(where);

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
    page: Number(page),
    limit: Number(limit),
  };
};
export const findOne = async (id: number) => {
  const result = await courseRepo.findOne({
    where: {
      id,
    },
  });
  return result;
};
export const update = async (id: number, payload: Course) => {
  const result = await AppDataSource.createQueryBuilder()
    .update(Course)
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
    .from(Course)
    .where("id = :id", { id })
    .execute();
  return result;
};
