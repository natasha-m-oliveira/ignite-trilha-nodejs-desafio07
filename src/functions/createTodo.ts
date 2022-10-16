import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";
import { v4 as uuidV4 } from "uuid";

interface ICreateTodo {
  title: string;
  deadline: Date;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  const todo = {
    id: uuidV4(),
    user_id,
    title,
    done: false,
    deadline,
  };

  await document
    .put({
      TableName: "users_todos",
      Item: todo,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(todo),
  };
};
