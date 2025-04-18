import { faker } from '@faker-js/faker';
import Column from 'src/modules/columns/entities/column.schema';
import { CardFactory } from './card-factory.mock';
import { buildTestFactory } from './generic-factory.mock';

const cardText = faker.lorem.words();

const mockColumnData = (): Column => {
	return {
		_id: faker.string.uuid(),
		title: faker.lorem.words(),
		color: '#aaaaaa',
		cards: CardFactory.createMany(2),
		cardText: cardText,
		isDefaultText: faker.datatype.boolean()
	};
};

export const ColumnFactory = buildTestFactory<Column>(() => {
	return mockColumnData();
});
