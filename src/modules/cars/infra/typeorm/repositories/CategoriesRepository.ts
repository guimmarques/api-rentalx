import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { getRepository, Repository } from 'typeorm';
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create(data: ICreateCategoryDTO): Promise<void> {
    const { name, description } = data;
    const category = this.repository.create({ name, description });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category: Category = (await this.repository.findOne({
      name,
    })) as Category;

    return category;
  }
}

export { CategoriesRepository };
