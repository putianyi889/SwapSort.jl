# SwapSort.jl

This package is intended to be a successor of [SortingNetworks.jl](https://github.com/JeffreySarnoff/SortingNetworks.jl). This package relies on the existing sorters which are currently copied from [SorterHunter](https://github.com/bertdobbelaere/SorterHunter), a C++ project. For a visualization of the algorithms, see [here](https://bertdobbelaere.github.io/sorting_networks.html).

- **PROS**
  - Supports `lt` and `by` keywords.
  - Easier to to add new algorithms as all codes are generated.
  - Supports sorting across different types. Note that type stability will become a problem in this case.
- **CONS**
  - Very long precompilation (~55s on my machine). The current bottleneck is `JSON.parsefile`. The importing is fine (~30ms).
  - Harder to troubleshoot since the most important things are written in macros.
  - Does not support sorting a vector. The reason is that `Base.sort` is efficient enough for a vector.
  - Does not support sorting a tuple at present.

## Internals
There are many internal functions in the form of `swapsortN_L_D(::Vararg{Any,N})`. `N` refers to the data size, `L` refers to the number of comparisons/swaps. Although currently unsupported, it's possible to execute some swaps in parallel and `D` refers to the number of steps when computing in parallel. All available `(N,L,D)` triples are listed at `SwapSort.SORTERS`.
```@repl index1
show(SwapSort.SORTERS)
```

The exported `swapsort` at present chooses the least available `L` for each `N`. For example, `swapsort(a,b) = swapsort2_1_1(a,b)`. The choices are listed at `SwapSort.BESTSIZE`.
```@repl index1
show(SwapSort.BESTSIZE)
```

The exported `tuplesort` is just another wrapper. It uses a different name as `swapsort` because otherwise it would be ambiguous whether the tuple is considered as one element or a group of elements. We note that `TupleTools.jl` uses merge sort on tuples.

## Performance
The sorting algorithm is called [sorting network](https://en.wikipedia.org/wiki/Sorting_network). It's not the most efficient algorithm for general purpose, but in Julia, it excels at sorting a few discrete variables, as collecting/splatting is very slow.

`StaticArrays.jl` implements `BitonicSort` which is a special case of sorting network. It is more flexible, but has two drawbacks:
- The import time of `StaticArrays` is 10x slower than `SwapSort`.
- Sorting a few variables needs to pack them into a static vector. The packing in Julia is slow.
