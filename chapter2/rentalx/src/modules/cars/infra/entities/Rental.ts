import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '../../../accounts/infra/typeorm/entities/User';
import { Car } from './Car';

@Entity('rentals')
class Rental {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @OneToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({ type: 'uuid' })
  car_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'timestamp' })
  start_date: string;

  @Column({ type: 'timestamp' })
  end_date: string;

  @Column({ type: 'timestamp' })
  expected_return_date: string;

  @Column({ type: 'numeric' })
  total: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
