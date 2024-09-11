import { FindOptionsWhere, Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";
import { Section } from "../entity/Section";
import { User } from "../entity/User";

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}

const sectionRepo = AppDataSource.getRepository(Section);

export const create = async (payload: Section, course: number, user: User) => {
  // TODO: need add validation schema
  const section = new Section();

  section.title = payload.title;
  section.description = payload.description;
  section.course = course;
  section.createdBy = user.id;

  const result = await sectionRepo.save(section);
  return result;
};
export const findAll = async (query: IPaginationQuery) => {
  const { limit, page, search } = query;

  let where: FindOptionsWhere<Section>[] = [];

  if (search) {
    where = [
      {
        title: Like(`%${search}%`),
      },
    ];
  }

  const data = await sectionRepo.find({
    where,
    skip: (page - 1) * limit,
    take: limit,
    order: {
      createdAt: "DESC",
    },
  });

  const total = await sectionRepo.countBy(where);

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
    page: Number(page),
    limit: Number(limit),
  };
};
export const findOne = async (id: number) => {
  const result = await sectionRepo.findOne({
    where: {
      id,
    },
  });
  return result;
};
export const update = async (id: number, payload: Section, course: number) => {
  const result = await AppDataSource.createQueryBuilder()
    .update(Section)
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
    .from(Section)
    .where("id = :id", { id })
    .execute();
  return result;
};
