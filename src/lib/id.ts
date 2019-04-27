let fakeId = Date.now() + Math.round(Math.random() * 1000);

export const getId = () => fakeId++;
