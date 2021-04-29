/**
         * @description: 创建链表单节点类
         * @param {*} val 节点值
         * @return {*}
         */
        function ListNode(val) {
            this.val = val
            this.next = null
        }

        class LinkedList {
            length = 0;
            head = null;

            getElementAt(index) {
                if (index < 0 || index >= this.length) return null

                let cur = this.head
                while (index--) {
                    cur = cur.next
                }
                return cur
            }

            append(val) {
                let node = new ListNode(val)

                if (!this.head) {
                    this.head = node
                } else {
                    let cur = this.getElementAt(this.length - 1)
                    cur.next = node
                }
                this.length += 1
            }

            insert(index, val) {
                if (index < 0 || index > this.length) return false

                let node = new ListNode(val)

                if (index === 0) {
                    node.next = this.head
                    this.head = node
                } else {
                    let prev = this.getElementAt(index - 1)
                    node.next = prev.next
                    prev.next = node
                }

                this.length++
                return true

            }

            removeAt(index) {
                if (index < 0 || index >= this.length) return null

                let cur = this.head

                if (index === 0) {
                    this.head = cur.next
                } else {
                    let prev = this.getElementAt(index - 1)
                    cur = prev.next
                    prev.next = cur.next
                }

                this.length -= 1
                return cur.val
            }

            indexOf(val) {
                let cur = this.head

                for (let i = 0; i < this.length; i++) {
                    if (cur.val === val) return i
                    cur = cur.next
                }

                return -1
            }

            remove(val) {
                let index = this.indexOf(val)
                return this.removeAt(index)
            }

            find(val) {
                let cur = this.head
                while (cur) {
                    if (cur.val == val) return cur
                    cur = cur.next
                }
                return null
            }

            get size() {
                return this.length
            }
        }