import LinkedList, { IListElement, ILinkedList } from "../LinkedList";

describe("LinkedList", () => {
  it(".next worked", () => {
    const list: ILinkedList = new LinkedList(["1", "2", "3"]);
    expect(list.next()).toBe("2");
  });

  it(".setFirstElement worked", () => {
    const list: ILinkedList = new LinkedList(["one", "two", "three", "four"]);
    list.setFirstElement("three");
    expect(list.next()).toBe("four");
  });

  it("circular next worked", () => {
    const list: ILinkedList = new LinkedList(["one", "two", "three", "four"]);
    list.setFirstElement("four");
    expect(list.next()).toBe("one");
  });

  it("flag visited is worked", () => {
    const list: ILinkedList = new LinkedList(["one", "two", "three", "four"]);
    list.setFirstElement("two");
    list.next();
    list.next();
    list.next();
    expect(list.next()).toBeNull();
  });

});
