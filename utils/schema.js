// import { varbinary, varchar } from "drizzle-orm/mysql-core";
import { pgTable, serial , varchar, text} from "drizzle-orm/pg-core";  

export const MockInterview = pgTable ('mockInterview', {
    id:serial('id').primaryKey(),
    jsonMockResponse:text('jsonMockResponse').notNull(),
    jobPosition:varchar ('jobPosition').notNull(),
    jobDesc:varchar ('jobDesc').notNull(),
    jobExperience:varchar ('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull()
})