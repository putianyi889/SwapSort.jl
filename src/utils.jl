"""
    min_max(x, y; lt=isless, by=identity) = lt(by(x), by(y)) ? (x,y) : (y,x)

The same as `Base.minmax`, but supports `lt` and `by` keywords which works as those in `Base.sort`.
"""
min_max(x, y; lt=isless, by=identity) = lt(by(x), by(y)) ? (x,y) : (y,x)

varstring(N) = string("a0", [",a$k" for k in 1:N-1]...)
_filename(N,L,D) = "Sort_$(N)_$(L)_$(D).json"
keywords() = Expr(:parameters, Expr(:(...), :kw))

function returnvals(N)
    ret = Expr(:return, Expr(:tuple))
    for k in 0:N-1
        push!(ret.args[1].args, localval(k))
    end
    ret
end
localval(i) = Symbol("a$i")
compswap(i,j) = Expr(:(=), Expr(:tuple, localval(i), localval(j)), Expr(:call, :min_max, keywords(), localval(i), localval(j)))

macro makesorter(expr)
    path = string(eval(expr))
    sorterdict = JSON.parsefile(path)
    N = sorterdict["N"]
    L = sorterdict["L"]
    D = sorterdict["D"]
    funname = "swapsort$(N)_$(L)_$(D)"
    ret = Meta.parse("function $funname(;kw...) end")
    for k in 0:N-1
        push!(ret.args[1].args, localval(k))
    end
    functionbody = ret.args[2].args
    for (a,b) in sorterdict["nw"]
        push!(functionbody, compswap(a,b))
    end
    push!(functionbody, returnvals(N))
    return ret
end

macro registersorter(expr)
    (N,L,D) = eval(expr)
    ret = Expr(:block)
    push!(ret.args, Meta.parse("swapsort($(varstring(N)); kw...) = swapsort$(N)_$(L)_$(D)($(varstring(N)); kw...)"))
    push!(ret.args, Meta.parse("tuplesort(I::Tuple{Vararg{Any, $N}}; kw...) = swapsort$(N)_$(L)_$(D)(I...; kw...)"))
    esc(ret)
end