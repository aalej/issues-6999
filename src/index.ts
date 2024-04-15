import { Datastore, PropertyFilter } from "@google-cloud/datastore";

const datastore = new Datastore({
  projectId: "dummy-project-id",
});

const KIND_USER = "User";

type User = {
  email: string;
  profile: {
    name: string;
  };
};

export async function getUsersByName(name: string) {
  const query = datastore
    .createQuery(KIND_USER)
    .filter(new PropertyFilter("profile.name", "=", name));
  const [entities] = await datastore.runQuery(query);
  return entities;
}

export async function addUser(data: User) {
  const key = datastore.key(KIND_USER);
  const entity = {
    key: key,
    data,
  };
  await datastore.save(entity);
}

async function main() {
  await addUser({
    email: "foo@example.com",
    profile: { name: "Awesome Name" },
  });

  const users = await getUsersByName("Awesome Name");
  console.log(users);
}

main();
