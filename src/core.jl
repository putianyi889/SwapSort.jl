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