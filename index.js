class Graph {
  constructor() {
    this.deps = {};
  }

  add(dependent, dependsOn = null) {
    if (!this.deps[dependsOn] && dependsOn !== null) {
      this.deps[dependsOn] = [];
    }

    if (!this.deps[dependent]) {
      this.deps[dependent] = dependsOn !== null ? [dependsOn] : [];
    } else {
      this.deps[dependent].push(dependsOn);
    }
  }

  /*
  Sorting process is as follows:
    - find dep that has no deps, add it to the queue
    - remove that dep from all other deps
    - repeat
   */
  sort() {
    const queue = [];
    const tmp = Object.assign({}, this.deps);

    function removeDep(d) {
      Object.entries(tmp).forEach(([dependent, deps]) => {
        // TODO: equality here can break
        tmp[dependent] = tmp[dependent].filter((dep) => dep !== d);
      });
    }

    let removedDep = false;
    do {
      if (!Object.keys(tmp).length) {
        break;
      }

      for (var dependent in tmp) {
        const deps = tmp[dependent];
        if (!deps.length) {
          queue.push(dependent);
          delete tmp[dependent];
          removeDep(dependent);
          removedDep = true;
          break;
        } else {
          removedDep = false;
        }
      }
    }
    while (removedDep);

    if (!removedDep) {
      throw new Error(`Found circular dependency in graph ${JSON.stringify(tmp, null, 2)}`);
    }

    return queue;
  }
}

module.exports = Graph;
