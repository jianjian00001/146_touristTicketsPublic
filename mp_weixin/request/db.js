const { httpPost } = require("./request");

function executeQuery(name, options, func, args) {
    return httpPost("/user/query", {
        name,
        options,
        func,
        args,
    });
}

function executeSelect(sql, type, binds) {
    return httpPost("/user/select", {
        sql,
        type,
        binds,
    });
}

export function Query(name) {
    this.name = name;
    this.options = {};
}

Query.prototype = {
    name: "",
    options: null,
    where(field, exp, condtion) {
        if (!this.options.where) {
            this.options.where = [];
        }
        var len = arguments.length;
        if (arguments.length == 1) {
            this.options.where.push({ name: field, raw: true });
            return this;
        }
        if (len == 2) {
            condtion = exp;
            exp = "=";
        }
        this.options.where.push({
            name: field,
            exp: exp,
            value: condtion,
        });
        return this;
    },
    executeQuery(func, args) {
        return executeQuery(this.name, this.options, func, args);
    },
    select() {
        return this.executeQuery("select", null);
    },
    find(id) {
        var args = null;
        if (id) {
            args = [id];
        }
        return this.executeQuery("find", args);
    },
    count(field) {
        var args = null;
        if (field) {
            args = [field];
        }
        return this.executeQuery("count", args);
    },
    avg(field) {
        var args = null;
        if (field) {
            args = [field];
        }
        return this.executeQuery("avg", args);
    },
    max(field) {
        var args = null;
        if (field) {
            args = [field];
        }
        return this.executeQuery("max", args);
    },
    min(field) {
        var args = null;
        if (field) {
            args = [field];
        }
        return this.executeQuery("min", args);
    },
    sum(field) {
        var args = null;
        if (field) {
            args = [field];
        }
        return this.executeQuery("sum", args);
    },
    column(field, key) {
        var args = [field];
        if (key) {
            args.push(key);
        }
        return this.executeQuery("column", args);
    },
    order(field, sort) {
        var len = arguments.length;
        var order = field;
        if (len == 2) {
            order += " " + sort;
        }
        this.getOptionList("order").push(order);
        return this;
    },
    alias(name) {
        this.options.alias = name;
        return this;
    },
    limit(offset, nLimit) {
        var len = arguments.length;
        var map = this.getOptionMap("limit");
        if (len == 1) {
            nLimit = Math.floor(offset);
            offset = null;
        }
        map.size = Math.floor(nLimit);
        map.offset = Math.floor(offset);
        return this;
    },
    joinInner(table, cond) {
        return this.join(table, cond, "INNER");
    },
    joinRight(table, cond) {
        return this.join(table, cond, "RIGHT");
    },
    joinLeft(table, cond) {
        return this.join(table, cond, "LEFT");
    },
    join(table, cond, type) {
        var str = ` ${type} JOIN ${table} ON ${cond} `;
        this.getOptionList("join").push(str);
        return this;
    },
    field(fi) {
        this.getOptionList("field").push(fi);
        return this;
    },
    group(gr) {
        this.getOptionList("group").push(gr);
        return this;
    },
    getOptionMap(name) {
        if (!this.options[name]) {
            this.options[name] = {};
        }
        return this.options[name];
    },
    getOptionList(name) {
        if (!this.options[name]) {
            this.options[name] = [];
        }
        return this.options[name];
    },
};

const DB = {
    /**
     * @returns Query
     */
    name(name) {
        return new Query(name);
    },
    select(sql, binds = []) {
        return executeSelect(sql, "select", binds);
    },
    find(sql, binds = []) {
        return executeSelect(sql, "find", binds);
    },
    execute(sql, binds = []) {
        return executeSelect(sql, "execute", binds);
    },
};

module.exports = DB;
