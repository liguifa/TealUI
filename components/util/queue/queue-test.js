define(["require", "exports", "assert", "./queue"], function (require, exports, assert, queue_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var queueTest;
    (function (queueTest) {
        function enqueueTest() {
            const q = new queue_1.default();
            assert.equal(q.length, 0);
            q.enqueue(1);
            assert.equal(q.length, 1);
            q.enqueue(2);
            assert.equal(q.length, 2);
        }
        queueTest.enqueueTest = enqueueTest;
        function emptyTest() {
            const q = new queue_1.default();
            assert.equal(q.empty, true);
            q.enqueue(1);
            assert.equal(q.empty, false);
            q.enqueue(2);
            assert.equal(q.empty, false);
            q.dequeue();
            assert.equal(q.empty, false);
            q.dequeue();
            assert.equal(q.empty, true);
            q.dequeue();
            assert.equal(q.empty, true);
        }
        queueTest.emptyTest = emptyTest;
        function topTest() {
            const q = new queue_1.default();
            assert.equal(q.top, undefined);
            q.enqueue(1);
            assert.equal(q.top, 1);
            q.enqueue(2);
            assert.equal(q.top, 1);
            q.dequeue();
            assert.equal(q.top, 2);
        }
        queueTest.topTest = topTest;
        function dequeueTest() {
            const q = new queue_1.default();
            assert.equal(q.dequeue(), undefined);
            q.enqueue(1);
            q.enqueue(2);
            q.enqueue(3);
            assert.equal(q.dequeue(), 1);
            assert.equal(q.dequeue(), 2);
            assert.equal(q.dequeue(), 3);
            assert.equal(q.dequeue(), undefined);
        }
        queueTest.dequeueTest = dequeueTest;
        function toArrayTest() {
            assert.deepEqual(new queue_1.default().toArray(), []);
            const q = new queue_1.default();
            q.enqueue(1);
            q.enqueue(2);
            q.enqueue(3);
            assert.deepEqual(q.toArray(), [1, 2, 3]);
            assert.deepEqual(q.toString(), [1, 2, 3].toString());
            q.inspect();
        }
        queueTest.toArrayTest = toArrayTest;
    })(queueTest = exports.queueTest || (exports.queueTest = {}));
});
//# sourceMappingURL=queue-test.js.map